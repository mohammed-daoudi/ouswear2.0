// Mock Database for Development - mimics MongoDB/Mongoose interface
// This allows existing API routes to work without changing code

interface MockDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  save(): Promise<MockDocument>;
  toJSON(): any;
  toObject(): any;
}

class MockQuery {
  private results: any[] = [];
  private queryObj: any = {};
  private sortObj: any = {};
  private skipNum: number = 0;
  private limitNum: number = 0;
  private selectFields: string = '';
  private isLean: boolean = false;

  constructor(private model: MockModel, private data: Map<string, any>) {}

  find(query: any = {}): this {
    this.queryObj = query;
    return this;
  }

  sort(sortObj: any): this {
    this.sortObj = sortObj;
    return this;
  }

  skip(num: number): this {
    this.skipNum = num;
    return this;
  }

  limit(num: number): this {
    this.limitNum = num;
    return this;
  }

  select(fields: string): this {
    this.selectFields = fields;
    return this;
  }

  lean(): this {
    this.isLean = true;
    return this;
  }

  async exec(): Promise<any[]> {
    // Apply query filtering
    const results: any[] = [];
    for (const [id, doc] of this.data) {
      if (this.model.matchesQuery(doc, this.queryObj)) {
        results.push(this.isLean ? doc : this.model.createDocument(doc));
      }
    }

    // Apply sorting
    if (Object.keys(this.sortObj).length > 0) {
      results.sort((a, b) => {
        for (const [field, direction] of Object.entries(this.sortObj)) {
          const aVal = a[field];
          const bVal = b[field];
          const mult = direction === 1 ? 1 : -1;
          
          if (aVal < bVal) return -1 * mult;
          if (aVal > bVal) return 1 * mult;
        }
        return 0;
      });
    }

    // Apply skip and limit
    const startIndex = this.skipNum;
    const endIndex = this.limitNum > 0 ? startIndex + this.limitNum : results.length;
    
    return results.slice(startIndex, endIndex);
  }

  // Make it thenable so it works with await
  then(onfulfilled?: any, onrejected?: any) {
    return this.exec().then(onfulfilled, onrejected);
  }
}

class MockModel {
  private data: Map<string, any> = new Map();
  private idCounter = 1;

  constructor(private name: string, private schema: any) {}

  private generateId(): string {
    return `mock_${this.name}_${this.idCounter++}`;
  }

  find(query: any = {}): MockQuery {
    return new MockQuery(this, this.data).find(query);
  }

  async findOne(query: any): Promise<any | null> {
    for (const [id, doc] of this.data) {
      if (this.matchesQuery(doc, query)) {
        return this.createDocument(doc);
      }
    }
    return null;
  }

  async findById(id: string): Promise<any | null> {
    const doc = this.data.get(id);
    return doc ? this.createDocument(doc) : null;
  }

  async create(docData: any): Promise<any> {
    const id = this.generateId();
    const now = new Date();
    const doc = {
      ...docData,
      _id: id,
      createdAt: now,
      updatedAt: now
    };
    
    // Generate slug if needed for products
    if (this.name === 'Product' && !doc.slug && doc.title) {
      doc.slug = doc.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    this.data.set(id, doc);
    return this.createDocument(doc);
  }

  async countDocuments(query: any = {}): Promise<number> {
    let count = 0;
    for (const [id, doc] of this.data) {
      if (this.matchesQuery(doc, query)) {
        count++;
      }
    }
    return count;
  }

  matchesQuery(doc: any, query: any): boolean {
    if (!query || Object.keys(query).length === 0) return true;
    
    for (const [key, value] of Object.entries(query)) {
      if (key === 'price' && typeof value === 'object') {
        // Handle price range queries
        const priceQuery = value as any;
        if (priceQuery.$gte !== undefined && doc.price < priceQuery.$gte) return false;
        if (priceQuery.$lte !== undefined && doc.price > priceQuery.$lte) return false;
      } else if (key === 'tags' && typeof value === 'object') {
        // Handle tags $in queries
        const tagsQuery = value as any;
        if (tagsQuery.$in && !tagsQuery.$in.some((tag: string) => doc.tags?.includes(tag))) {
          return false;
        }
      } else if (doc[key] !== value) {
        return false;
      }
    }
    return true;
  }

  createDocument(data: any): MockDocument {
    const doc = {
      ...data,
      save: async () => {
        data.updatedAt = new Date();
        this.data.set(data._id, data);
        return doc;
      },
      toJSON: () => ({ ...data }),
      toObject: () => ({ ...data })
    } as MockDocument;
    return doc;
  }

  // Seed with initial data
  async seed(initialData: any[]) {
    for (const item of initialData) {
      await this.create(item);
    }
  }
}

// Mock database connection
export class MockDatabase {
  private models: Map<string, MockModel> = new Map();
  private connected = false;

  async connect(): Promise<void> {
    if (this.connected) return;
    
    console.log('🔄 Connecting to mock database...');
    
    // Initialize models
    const ProductModel = new MockModel('Product', {});
    const UserModel = new MockModel('User', {});
    
    this.models.set('Product', ProductModel);
    this.models.set('User', UserModel);
    
    // Seed with sample data
    await this.seedSampleData();
    
    this.connected = true;
    console.log('✅ Connected to mock database');
  }

  getModel(name: string): MockModel {
    const model = this.models.get(name);
    if (!model) {
      throw new Error(`Model ${name} not found`);
    }
    return model;
  }

  private async seedSampleData() {
    const ProductModel = this.models.get('Product')!;
    
    await ProductModel.seed([
      {
        title: "Crimson Cap",
        description: "Premium streetwear cap with dark crimson accents and 3D embossed logo.",
        price: 89.99,
        currency: "USD",
        images: [
          "/images/crimson-cap-1.jpg",
          "/images/crimson-cap-2.jpg"
        ],
        models: [
          "/models/crimson-cap.glb"
        ],
        variants: [
          { name: "Color", value: "Crimson", price: 89.99, stock: 25 },
          { name: "Color", value: "Black", price: 89.99, stock: 30 }
        ],
        stock: 55,
        tags: ["streetwear", "premium", "caps", "limited"]
      },
      {
        title: "Shadow Beanie",
        description: "Ultra-soft merino wool beanie with minimal branding for the discerning streetwear enthusiast.",
        price: 64.99,
        currency: "USD", 
        images: [
          "/images/shadow-beanie-1.jpg",
          "/images/shadow-beanie-2.jpg"
        ],
        models: [
          "/models/shadow-beanie.glb"
        ],
        variants: [
          { name: "Color", value: "Shadow", price: 64.99, stock: 40 },
          { name: "Color", value: "Charcoal", price: 64.99, stock: 35 }
        ],
        stock: 75,
        tags: ["streetwear", "beanies", "merino", "minimal"]
      },
      {
        title: "Opium Snapback",
        description: "Signature opium-themed snapback with metallic thread details and premium materials.",
        price: 124.99,
        currency: "USD",
        images: [
          "/images/opium-snapback-1.jpg", 
          "/images/opium-snapback-2.jpg"
        ],
        models: [
          "/models/opium-snapback.glb"
        ],
        variants: [
          { name: "Color", value: "Black/Red", price: 124.99, stock: 15 },
          { name: "Color", value: "All Black", price: 124.99, stock: 20 }
        ],
        stock: 35,
        tags: ["streetwear", "premium", "snapback", "signature", "limited"]
      },
      {
        title: "Aura Bucket Hat",
        description: "Reversible bucket hat featuring gradient fade technology and water-resistant coating.",
        price: 79.99,
        currency: "USD",
        images: [
          "/images/aura-bucket-1.jpg",
          "/images/aura-bucket-2.jpg"
        ],
        models: [
          "/models/aura-bucket.glb"
        ],
        variants: [
          { name: "Color", value: "Red Fade", price: 79.99, stock: 28 },
          { name: "Color", value: "Black Fade", price: 79.99, stock: 32 }
        ],
        stock: 60,
        tags: ["streetwear", "bucket", "gradient", "reversible"]
      }
    ]);

    const UserModel = this.models.get('User')!;
    
    await UserModel.seed([
      {
        name: "Admin User",
        email: "admin@ouswear.com",
        passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LesbLOOdOCOKOd.Wm", // admin123
        role: "admin",
        addresses: []
      }
    ]);
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    console.log('✅ Disconnected from mock database');
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Global mock database instance
export const mockDb = new MockDatabase();