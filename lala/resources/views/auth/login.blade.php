@extends('layouts.app')
@section('content')
@include('commons.error')
<div class="container pb-4">
        <div class="row">
    <div class="col-md-6 col-lg-4">
                <div class="card mb-3">
            <div class="card-header">ログイン</div>
            <div class="card-body">
                <form action="/login" method="post">
                    @csrf
                    <dl class="form-list">
                        <dt class="mb-2">メールアドレス</dt>
                        <dd class="mb-4"><input type="email" name="email" class="form-control" value=""></dd>
                        <dt class="mb-2">パスワード</dt>
                        <dd class="mb-4"><input type="password" class="form-control" name="password"></dd>
                    </dl>
                    <button type="submit" class="btn btn-success w-100">ログイン</button>
                </form>
            </div>
        </div>
        <a href="/register">会員登録はこちら</a>
    </div>
</div>
</div>
    @endsection()