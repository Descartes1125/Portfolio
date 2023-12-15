@extends('layouts.app')
@section('content')
@include('commons.error')
<div class="container pb-4">
        <div class="row">
    <div class="col-md-8 col-lg-6">
                <div class="card mb-3">
            <div class="card-header">商品登録</div>
            <div class="card-body">
                <form action="{{ route('products.store') }}" method="post">
@csrf
    <dt>カテゴリ</dt>
    <dd>
        <select name="category_id" class="form-select">
        @foreach ($categories as $category)
        <option value="{{ $category->id }}" >
            {{ $category->name }}
        </option>
    @endforeach
                    </select>
    </dd>                        
    <dt>メーカー</dt>
    <dd><input type="text" name="maker" class="form-control" value=""></dd>
    <dt>商品名</dt>
    <dd><input type="text" name="name" class="form-control" value=""></dd>
    <dt>価格</dt>
    <dd><input type="text" name="price" class="form-control" value=""></dd>
</dl>                    <button type="submit" class="btn btn-danger">登録する</button>
                    <a class="btn btn-secondary" href="/">キャンセル</a>
                </form>
            </div>
        </div>
        
    </div>
</div>




    </div>
@endsection