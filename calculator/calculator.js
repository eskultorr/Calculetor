const displayValorAnterior = document.getElementById('valorAnterior');
const displayValorActual = document.getElementById('valorActual');
const numberButtons = document.querySelectorAll('.numeros');
const operatorsButtons = document.querySelectorAll('.operator');


//calculadora calcular 
class calcul
{
	sumar(nun1,nun2)
	{
		return nun1 + nun2;
	}
	restar(nun1,nun2)
	{
		return nun1 - nun2;
	}
	mutiplicar(nun1,nun2)
	{
		return nun1 * nun2;
	}
	dividir(nun1,nun2)
	{
		return nun1 / nun2;
	}
}
const calculadora = new calcul();


//controlar botones y que se vea por pantalla

class pantalla 
{
	constructor(displayValorAnterior,displayValorActual)
	{
		this.displayValorActual = displayValorActual;//para que se vea por pantalla
		this.displayValorAnterior = displayValorAnterior;//para que se vea por pantalla
		this.calculadora = new calcul();
		this.tipoOperacion = undefined;
		this.valorActual='';//los numeros que vamos guardando
		this.valorAnterior = '';
		this.signos =
		{
			sumar:'+',
			restar:'-',
			mutiplicar:'*',
			dividir:'/'
		}
	}
	//borrar numeros
	borrar()
	{
		this.valorActual = this.valorActual.toString().slice(0,-1);
		this.imprimirValores();
	}
	//borrar todo c
	borrarTodo()
	{
		this.valorActual = '';
		this.valorAnterior = '';
		this.tipoOperacion = undefined;
		this.imprimirValores();
	}
	agregarNumeros(numeros)
	{
		if(numeros === '.' && this.valorActual.includes('.')) return
		this.valorActual =this.valorActual.toString() + numeros.toString();
		this.imprimirValores();
	}
	imprimirValores()
	{
		this.displayValorActual.textContent = this.valorActual;
		this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
	}
	calcular()
	{
		const numeroAnterior = parseFloat(this.valorAnterior);
		const numeroActual = parseFloat(this.valorActual);

		if(isNaN(numeroActual) || isNaN(numeroAnterior))
		{
			return
		}
		this.valorActual = this.calculadora[this.tipoOperacion](numeroAnterior,numeroActual);
	}

	computar(tipo)
	{
		this.tipoOperacion !== 'resultado' && this.calcular();
		this.tipoOperacion = tipo;
		this.valorAnterior = this.valorActual || this.valorAnterior;
		this.valorActual ='';
		this.imprimirValores();
	}
}

const display = new pantalla(displayValorAnterior,displayValorActual);
numberButtons.forEach(boton=>
{
	boton.addEventListener('click', ()=>
	{
		display.agregarNumeros(boton.textContent);
	})
})

operatorsButtons.forEach(valor=>
{
	valor.addEventListener('click', ()=>
	{
		display.computar(valor.value);
	})
})

