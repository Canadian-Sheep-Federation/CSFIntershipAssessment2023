import axios from 'axios';

export async function getRandomRecipe() {
	try {
		const response = await axios.get("https://api.spoonacular.com/recipes/random?number=1&apiKey=" + process.env.REACT_APP_API_KEY);
		console.log(response);
        return response?.data.recipes[0];
	}
	catch (error) {
		console.log(error);
        return []
	}
}
