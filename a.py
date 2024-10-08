import requests

def get_pokemon_data(url):
    response = requests.get(url)
    return response.json()

def get_all_pokemon_urls(limit=1000):
    url = f"https://pokeapi.co/api/v2/pokemon?limit={limit}"
    response = requests.get(url)
    data = response.json()
    return [result['url'] for result in data['results']]

def get_pokemon_speed(pokemon_url):
    pokemon_data = get_pokemon_data(pokemon_url)
    for stat in pokemon_data['stats']:
        if stat['stat']['name'] == 'speed':
            return stat['base_stat']
    return 0

def find_fastest_pokemon():
    pokemon_urls = get_all_pokemon_urls()
    fastest_pokemon = None
    highest_speed = 0
    
    for url in pokemon_urls:
        speed = get_pokemon_speed(url)
        if speed > highest_speed:
            highest_speed = speed
            fastest_pokemon = get_pokemon_data(url)['name']
    
    return fastest_pokemon, highest_speed

if __name__ == "__main__":
    fastest_pokemon, highest_speed = find_fastest_pokemon()
    print(f"The Pokémon with the highest speed is {fastest_pokemon} with a speed of {highest_speed}.")
