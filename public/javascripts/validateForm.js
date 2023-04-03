const inputs = document.querySelectorAll('.input');
const incomplete = document.getElementById('.incomplete');
const form = document.getElementById('msform');
const latitude = document.getElementById('latitude');
const latitude = document.getElementById('longitude');

form.addEventListener('submit', (e)=>{
let messages = [];
console.log('ok papi');
for(const elem of inputs)
{
	if(elem.value === null)
		c
		e.preventDefault();
		incomplete.hidden = false;
		elem.style.backgoundColor = 'red';
		messages.push(elem.placeholder + "is Empty!");
}
	if(latitude.value.isNan())
		{
			e.preventDefault();
			elem.style.backgroundColor = 'red';
			messages.push("latitude must be a number!")
		}
	if(longitude.value.isNan())
		{
			e.preventDefault();
			elem.style.backgroundColor = 'red';
			messages.push("longitude must be a number!")
		}
	if(latitude.value > 90 || longitude.value < -90)
		{
			e.preventDefault();
			elem.style.backgroundColor = 'red';
			messages.push("latitude values exceed limits!")
		}
	if(longitude.value > 180 || longitude.value < -180)
		{
			e.preventDefault();
			elem.style.backgroundColor = 'red';
			messages.push("longitude values exceed limits!")
		}
		incomplete.innerText = message.join(', ');
});
