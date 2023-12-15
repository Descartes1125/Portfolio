@extends('layouts.app')
@section('content')
@include('commons.error')
<div class="container pb-4">
        <div class="row">
    <div class="col-md-6 col-lg-4">
                <div class="card mb-3">
            <div class="card-header">会員登録</div>
            <div class="card-body">
                <form action="{{ route('register') }}" method="post">
                    @csrf
                    <dl class="form-list">
                        <dt class="mb-2">名前</dt>
                        <dd class="mb-4"><input type="text" name="name" class="form-control" value=""></dd>
                        <dt class="mb-2">メールアドレス</dt>
                        <dd class="mb-4"><input type="email" name="email" class="form-control" value=""></dd>
                        <dt class="mb-2">パスワード</dt>
                        <dd class="mb-4"><input type="password" name="password" class="form-control"></dd>
                        <dt class="mb-2">パスワード（確認用）</dt>
                        <dd class="mb-4"><input type="password" name="password_confirmation" class="form-control" placeholder="もう一度入力"></dd>
                    </dl>
                    <button type="submit" class="btn btn-danger w-100">登録する</button>                
                </form>
            </div>
        </div>
        <a href="/login">ログインはこちら</a>
    </div>
</div>




    </div>
@endsection()