<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Events\UserLoggedIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|max:255|unique:users',
            'password'=>'required|string|min:8',
            'role'=>'required|string|max:255',
            'image'=>'nullable|sometimes|image|mimes:jpg,jpe,gif,png,svg,jpeg,webp|max:2028'
        ]);

        $imagePath=null;

        if($request->hasFile('image')){
            $imagePath=$request->file('image')->store('images','public');
        }

        $user= User::create([
            'name'=>$request->input('name'),
            'email'=>$request->input('email'),
            'tel'=>$request->input('tel'),
            'password'=>Hash::make($request->input('password')),
            'role'=>$request->input('role'),
            'image'=>$imagePath
        ]);

        // Auth::login($user);
        return response()->json([
            'message'=>'user registered successfully',
            'user'=>$user
        ],201);
    }

    public function login(Request $request){
        
        $request->validate([
            'email'=>'required|email|max:255',
            'password'=>'required|string|min:8'
        ]);

        $user= User::where('email',$request->input('email'))->first();

        if(!$user|| !Hash::check($request->input('password'),$user->password)){
            return response()->json([
                'message'=>'Invalid email or password'
            ],401);
        }

        Auth::login($user);
        event(new UserLoggedIn($user));

        return response()->json([
            'message'=>'user logged in successfully',
            'user'=>$user->makeHidden('cart')
        ],200);
    }
    public function logout(Request $request){

        if(!$request->user()){
            return response()->json(
                ['error','Unauthorized'],
                404
            );
        }

        auth()->guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'message'=>'logged out successfully',
        ] ,200);
        
    }
}
