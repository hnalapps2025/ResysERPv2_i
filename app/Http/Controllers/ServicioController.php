<?php
namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServicioController extends Controller
{
    public function index()
    {
        $servicios = Servicio::all();
        return view('servicios.index', compact('servicios'));
    }

    public function create()
    {
        return view('servicios.create');
    }

    public function store(Request $request)
    {
        $request->validate([
			'Nombre' => 'required|string|max:255',
			'AceptaCupoWeb' => 'required|boolean',
			'NroCuposWeb' => [
				'nullable',
				'integer',
				'min:1',
				Rule::requiredIf(fn () => $request->AceptaCupoWeb == 1),
			],
		]);

		Servicio::create($request->all());

		return redirect()->route('servicios.index');
    }

    public function edit($id)
    {
        $servicio = Servicio::findOrFail($id);
        return view('servicios.edit', compact('servicio'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
			'Nombre' => 'required|string|max:255',
			'AceptaCupoWeb' => 'required|boolean',
			'NroCuposWeb' => [
				'nullable',
				'integer',
				'min:1',
				Rule::requiredIf(fn () => $request->AceptaCupoWeb == 1),
			],
		]);
		if ($request->AceptaCupoWeb == 0) {
			$request->merge(['NroCuposWeb' => null]);
		}
		$servicio = Servicio::findOrFail($id);
		$servicio->update($request->all());

		return redirect()->route('servicios.index');
    }

    public function destroy($id)
    {
        Servicio::destroy($id);
        return redirect()->route('servicios.index');
    }
}
