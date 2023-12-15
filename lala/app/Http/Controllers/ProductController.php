<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $allProducts = Product::get();
        $products = Product::paginate(20);
       
        return view('index', compact('products','allProducts'));       }


       public function search()
{
    
    $keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '';
    $category_id = isset($_GET['category_id']) ? $_GET['category_id'] : '';
    $min_price = isset($_GET['min_price']) ? $_GET['min_price'] : '';
    $max_price = isset($_GET['max_price']) ? $_GET['max_price'] : '';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : '';

    $query = Product::query();

if ($category_id !== '') {
    $query->where('category_id', '=', $category_id);
}

$query->where(function ($q) use ($keyword) {
    $q->where('name', 'LIKE', "%$keyword%");
    $q->orWhere('maker', 'LIKE', "%$keyword%");
});

if ($min_price !== '') {
    $query->where('price', '>=', $min_price);
}

if ($max_price !== '') {
    $query->where('price', '<=', $max_price);
}

    switch ($sort) {
        case 'price_asc':
            $query->orderBy('price', 'asc');
            break;
        case 'price_desc':
            $query->orderBy('price', 'desc');
            break;
        // 他のソート条件があればここに追加
        default:
            // デフォルトのソート条件を指定（例: IDで昇順）
            $query->orderBy('id', 'asc');
            break;
    }
    $allProducts = $query->get();
    $products = $query->paginate(20)->appends(request()->all());
    return view('index', compact('products','allProducts'));
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = new Product();
        $categories = Category::all();

        return view('products.create',compact('product','categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'category_id' => 'required|numeric',
            'maker' => 'required',
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        $product = new Product();
        $product->category_id = $request->category_id;
        $product->maker = $request->maker;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();
        return redirect()->route('top');
        }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
    return view('products.edit', compact('product', 'categories'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $this->validate($request, [
            'category_id' => 'required|numeric',
            'maker' => 'required',
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        $product->category_id = $request->category_id;
        $product->maker = $request->maker;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();
        return redirect()->route('top');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('top');
        }
}
