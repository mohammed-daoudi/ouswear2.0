import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured') === 'true';
    const search = searchParams.get('search') || '';

    // Build query
    const query: any = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    if (category) {
      query.tags = { $in: [category] };
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Build sort options
    let sortOptions: any = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'name':
        sortOptions = { title: 1 };
        break;
      case 'popularity':
        // TODO: Implement popularity based on sales/views
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute query
    let productsQuery = Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    // If featured products requested, limit to featured items
    if (featured) {
      // For demo purposes, just get recent products
      // In production, you'd have a featured flag in the schema
      productsQuery = Product.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
    }

    const [products, totalCount] = await Promise.all([
      productsQuery.lean(),
      Product.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    const { title, description, price, images } = body;
    
    if (!title || !description || !price || !images?.length) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new product
    const product = new Product(body);
    await product.save();

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}