<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function login(Request $request)
	{
		if($request->method()=='POST')
		{
			$request->validate([
				'Usuario' => 'required|string',
				'ClaveVWeb' => 'required|string',
			]);
			$empleado = Empleado::where('Usuario', $request->Usuario)->first();
			if ($empleado && md5($request->ClaveVWeb) === $empleado->ClaveVWeb)
			{
				Auth::guard('empleado')->login($empleado);
				$request->session()->regenerate();
				return redirect()->intended('/principal');
			}
			return back()->withErrors([
				'Usuario' => 'Usuario o contraseña incorrectos',
			])->onlyInput('Usuario');
		}
		else
		{
			if(Auth::guard('empleado')->check())
				return redirect('/principal');
			else
				return view('login');
		}
	}

    public function logout(Request $request)
    {
        Auth::guard('empleado')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
	
	public function principal(Request $request)
    {
        return view('principal');
    }
	public function cambiar_contrasena(Request $request)
    {
        if($request->method()=='POST')
			if($request->usuario==auth()->user()->Usuario)
				if(md5($request->clave_a) == auth()->user()->ClaveVWeb)
					if($request->clave_n==$request->clave_rn)
					{
						$fa=DB::update("UPDATE Empleados SET ClaveVWeb = ? WHERE (IdEmpleado = ?) AND (ClaveVWeb =?)",[md5($request->clave_n),auth()->user()->IdEmpleado,auth()->user()->ClaveVWeb]);
						if($fa>0)
						{
							auth()->user()->ClaveVWeb=md5($request->clave_n);
							return redirect('principal');
						}
						else
							return view('cambiar_contrasena')->with('Error',"No se pudo realizar la operacion, Reintente por favor.");
					}
					else
						return view('cambiar_contrasena')->with('Error',"No coinciden las claves.");
				else
					return view('cambiar_contrasena')->with('Error',"La clave antigua no es correcta.");
			else
				return view('cambiar_contrasena')->with('Error',"Los datos de usuario no coinciden.");
		else
			return view('cambiar_contrasena');
    }
}