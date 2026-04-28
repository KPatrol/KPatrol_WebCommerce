import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON, DEFAULT_PRODUCTS, Product } from '@/lib/data-store';

function getProducts(): Product[] {
  return readJSON<Product[]>('products', DEFAULT_PRODUCTS)
    .sort((a, b) => a.order - b.order);
}

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const products = readJSON<Product[]>('products', DEFAULT_PRODUCTS);

  const newProduct: Product = {
    id: `product-${Date.now()}`,
    name: body.name ?? 'Sản phẩm mới',
    shortDesc: body.shortDesc ?? '',
    description: body.description ?? '',
    price: Number(body.price) || 0,
    priceSuffix: body.priceSuffix ?? '/robot',
    currency: 'VND',
    category: body.category ?? 'robot',
    images: Array.isArray(body.images) ? body.images : ['/images/placeholder.png'],
    features: Array.isArray(body.features) ? body.features : [],
    specs: body.specs ?? {},
    badge: body.badge || undefined,
    available: body.available !== false,
    order: products.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  writeJSON('products', products);
  return NextResponse.json(newProduct, { status: 201 });
}
