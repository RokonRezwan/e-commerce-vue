<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Product;
use App\Models\OrderDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;

class OrderApiController extends Controller
{
    private $_getColumns = ['id', 'category_id', 'name', 'slug', 'image', 'description', 'is_active'];

    public function index()
    {
        $orders = Order::with('orderDetails')->get($this->_getColumns);
        $products = Product::get(['id','name','image']);
        
        return response()->json([
            'orders' => $orders,
            'products' => $products
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            DB::transaction(function () use($request)
            {
                $shipping_meta = $request->only('shippingFullName', 'shippingContactNumber', 'shippingAddress');
                $billing_meta = $request->only('billingFullName', 'billingContactNumber', 'billingAddress');

                $orderNumber = random_int(100000,999999);

                while(Order::where('order_number', $orderNumber)->exists())
                {
                    $orderNumber++;
                }

                $order = new Order;
                
                $order->user_id = 1;
                $order->order_status_id = 1;
                $order->order_number = $orderNumber;
                $order->shipping_address = $shipping_meta;
                $order->billing_address = $billing_meta;
                $order->grand_total = $request->grand_total;
                $order->payment_method = $request->payment_method;

                $order->save();

                $all_prices = $request->prices;
                $product_names = $request->product_name;
                $quantities = $request->quantity;

                $cartItems = [];

                if(($all_prices !== NULL) && ($product_names !== NULL)){
                    foreach ($all_prices as $index => $price) {
                        $cartItems[] = [
                            'order_id' => $order->id,
                            'product_id' => $product_id[$index],
                            'product_name' => $product_names[$index],
                            'price' => $price,
                            'quantity' => $quantities[$index],
                        ];
                    }
                }

                    if (count($cartItems)){
                        $orderDetails = new OrderDetails;
                        $orderDetails->insert($cartItems);
                    }
            });

        } catch (QueryException $e) {

            return response()->json(['status' => $e->getMessage()]);
        }

        return response()->json(['status' => 'Order Placed Successfully']);
    }
}
