<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;

class CategoryController extends Controller
{
    private $_getColumns = ['id', 'name','is_active'];

    public function index()
    {
        $categories = Category::get($this->_getColumns);

        return view('categories.index', compact('categories'));
    }

    public function create()
    {
        return view('categories.create');
    }
     
    public function store(StoreCategoryRequest $request)
    {
        try 
        {
            $category = new Category; 
            
            $category->name = $request->name;
            $category->slug = Str::slug($request->name, '-');
            
            $category->save();
            
        } catch (QueryException $e) {

            return redirect()->route('categories.index')->with('errorMsg', $e->getMessage());
        }

        return redirect()->route('categories.index')->with('status', 'Category has been created successfully.');
    }

    public function show(Category $category)
    {
        return view('categories.show', compact('category'));
    }

    public function edit(Category $category)
    {
        return view('categories.edit', compact('category'));
    }
    
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try 
        {
            $category->name = $request->name;

            $category->update();
        } catch (QueryException $e) {

            return redirect()->route('categories.index')->with('errorMsg', $e->getMessage());
        }

        return redirect()->route('categories.index')->with('status', 'Category has been updated successfully.');
    }

    public function destroy(Category $category)
    {
        $p = Product::where('category_id', $category->id)->count();

        if ($p == 0) {
            $category->delete();
        } 
        else {
            return redirect()->route('categories.index')->with('errorMsg', 'Category has products. You can not delete it.');
        }
        
        return redirect()->route('categories.index')->with('status','Category has been deleted successfully !');
    }

    public function changeStatus(Category $category)
    {
        $category->is_active = !$category->is_active;

        $category->update();

        return redirect()->route('categories.index')->with('status','Category active status has been changed successfully !');
    }
}
