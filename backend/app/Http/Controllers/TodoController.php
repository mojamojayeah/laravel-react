<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Requests\Storetodo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storetodo $request)
    {
        $todo = Todo::create($request->all());
        return response()->json($todo,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $todo = Todo::find($id);
        return response()->json($todo,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Storetodo $request, $id)
    {
        $update = [
            'title' => $request->title,
            'isDone' => $request->isDone,
        ];
        $todo = Todo::where('id',$id)->update($update);
        $todos = Todo::all();
        if($todo){
            return response()->json($todos,200);
        }else{
            return response()->json(['error'=>'Todo not found'],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todo = Todo::where('id',$id)->delete();
        if($todo){
            return response()->json(['success'=>'Todo deleted'],200);
    }else{
        return response()->json(['error'=>'Todo not found'],404);
    }
}
}
