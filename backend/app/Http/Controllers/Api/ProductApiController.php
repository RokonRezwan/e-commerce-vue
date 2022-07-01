<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductApiController extends Controller
{
    private $_getColumns = (['id', 'category_id', 'name', 'slug', 'image', 'description', 'is_active']);

    public function index()
    {
        $products = Product::with('category:id,name,slug','currentPrice')->where('is_active', true)->get($this->_getColumns);
        
        return response()->json([
            'products' => $products
        ], 200);
    }

    public function show(Product $api_product)
    {
        $product = Product::with('category:id,name,slug','prices:id,product_id,price_type_id,amount,start_date,end_date')->find($api_product->id);
        return response()->json([
            'message' => "Product Showed Successfully!!",
            'product' => $product
        ], 200);
    }
}
