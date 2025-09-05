<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use Illuminate\Support\Facades\Auth;

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

			if ($empleado && md5($request->ClaveVWeb) === $empleado->ClaveVWeb) {
				Auth::guard('empleado')->login($empleado);
				$request->session()->regenerate();
				return redirect()->intended('/principal');
			}

			return back()->withErrors([
				'Usuario' => 'Usuario o contraseña incorrectos',
			])->onlyInput('Usuario');
		}
		else
			return view('login');
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
}