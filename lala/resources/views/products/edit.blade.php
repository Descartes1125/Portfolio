@extends('layouts.app')
@section('content')
@include('commons.error')
<div class="container pb-4">
        <div class="row">
    <div class="col-md-8 col-lg-6">
                <div class="card mb-3">
            <div class="card-header">商品情報編集</div>
            <div class="card-body">
                <form action="{{ route('products.update',$product)}}" method="post">
                    @csrf
                    @method('patch')
                    <div class="row">
    <dl class="form-list">
    <dt>カテゴリ</dt>
    <dd>
    <select name="category_id" class="form-select">
    @foreach ($categories as $category)
        <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected' : '' }}>
            {{ $category->name }}
        </option>
    @endforeach
</select>
    </dd>                        
    <dt>メーカー</dt>
    <dd><input type="text" name="maker" class="form-control" value="{{ $product->maker }}"></dd>
    <dt>商品名</dt>
    <dd><input type="text" name="name" class="form-control" value="{{ $product->name }}"></dd>
    <dt>価格</dt>
    <dd><input type="text" name="price" class="form-control" value="{{ $product->price }}"></dd>
    </dl>                   
                   <button type="submit" class="btn btn-primary">更新する</button>
                    <a class="btn btn-secondary" href="/">キャンセル</a>                    
                </form>
            </div>
        </div>
        <form onsubmit="return confirm('本当に削除しますか？')" action="{{route('products.delete',$product)}}" method="post">
        @csrf 
        @method('delete')
            <button type="submit" class="btn btn-link btn-sm">削除</button>
        </form>
    </div>
</div>
 </div>
 @endsection