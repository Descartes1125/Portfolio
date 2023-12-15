@extends("layouts.app")
@section("content")
<div class="row">
    <div class="col-md-4 col-lg-3  mb-4">
        <form class="card mb-4" action="{{ route('search') }}" method="get">
            <div class="card-header">商品検索</div>
            <dl class="search-box card-body mb-0">
                <dt>カテゴリ</dt>
                <dd>
                    <select name="category_id" class="form-select">
                        <option value=""></option>
                        @foreach (App\Models\Category::all() as $category)
                        <option value="{{ $category->id }}"{{ Request::get('category_id') == $category->id ? ' selected' : ''}}>{{ $category->name }}</option>
                        @endforeach
                    </select>
                </dd>
                <dt>キーワード</dt>
                <dd>
                    <input type="text" name="keyword" class="form-control" placeholder="メーカー・商品名" value="{{ Request::get('keyword') }}">
                </dd>
                <dt>価格帯</dt>
                <dd>
                    <div class="input-group">
                        <input type="number" name="min_price" class="form-control" placeholder="円" value="{{ Request::get('min_price') }}">
                        <span class="input-group-text">〜</span>
                        <input type="number" name="max_price" class="form-control" placeholder="円" value="{{ Request::get('max_price') }}">
                    </div>
                </dd>
                <dt>並び順</dt>
                <dd>
                    <select name="sort" class="form-select">
                        <option value="">登録順</option>
                        <option value="price_asc"{{ Request::get('sort') == 'price_asc' ? ' selected' : ''}}>価格の安い順</option>
                        <option value="price_desc"{{ Request::get('sort') == 'price_desc' ? ' selected' : ''}}>価格の高い順</option>
                    </select>
                </dd>                          
            </dl>
            <div class="card-footer">
                <button type="submit" class="btn w-100 btn-success" >検索</button>
            </div>
        </form>
        @auth
        <form onsubmit="return confirm('ログアウトしますか？')" action="{{ route('logout') }}" method="post">
            @csrf
            <button type="submit" class="btn btn-sm btn-dark">ログアウト</button>
        </form>
        @endauth
    </div>
    <div class="col-md-8 col-lg-9">
    <div class="alert alert-secondary d-flex justify-content-between align-items-center">
            <div>検索結果：{{ $products->total() }}件</div>
            <a class="btn btn-sm btn-danger" href="{{ route('products.create') }}">新規登録</a>
        </div>
        <div class="d-flex mb-3 justify-content-between rounded bg-info py-2 px-3">
            <div class="mx-2">最高値 ¥{{$allProducts->max('price')}}</div>
            <div class="mx-2">最安値 ¥{{$allProducts->min('price')}}</div>
            <div class="mx-2">平均額 ¥{{ number_format($allProducts->avg('price'), 2) }}</div>
            <div class="mx-2">合計額 ¥{{$allProducts->sum('price')}}</div>
        </div>
        <div class="table-responsive">            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>　</th><th>ID</th><th>カテゴリ</th><th>メーカー</th><th>商品名</th><th>価格</th><th>登録日</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($products as $product)
                    <tr>
                    <td><a href="{{ route('products.edit', ['product' => $product->id]) }}"><i class="fa fa-pencil-alt"></i></a></td>
                        <td>{{ $product->id }}</td>
                        <td>{{ $product->category->name }}</td>
                        <td>{{ $product->maker }}</td>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->price }}</td>
                        <td>{{ Carbon\Carbon::parse($product->created_at)->format('Y年m月d日') }}</td>
                                          </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        {{ $products->appends(Request::all())->links() }}
    </div>
</div>
@endsection