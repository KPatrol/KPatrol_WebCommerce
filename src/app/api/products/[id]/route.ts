import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON, DEFAULT_PRODUCTS, Product } from '@/lib/data-store';

function getProducts() {
  return readJSON<Product[]>('products', DEFAULT_PRODUCTS);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  products[idx] = {
    ...products[idx],
    ...body,
    id: params.id, // can't change id
    updatedAt: new Date().toISOString(),
  };
  writeJSON('products', products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = getProducts();
  const newList = products.filter((p) => p.id !== params.id);
  if (newList.length === products.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeJSON('products', newList);
  return NextResponse.json({ success: true });
}
