package com.teambuilder.mapper;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.teambuilder.domain.Pokemon;
import com.teambuilder.domain.PokemonType;
import com.teambuilder.dto.PokeInfoCompleteDTO;
import com.teambuilder.dto.PokedexItemDTO;

public class PokemonMapper {
	
	// Convierte un objeto Pokemon (entidad) a un PokeInfoCompleteDTO para enviar al frontend.
	// Extrae los campos necesarios y transforma los tipos de Set<Types> a List<String>.
	public static PokeInfoCompleteDTO mapperToDTO(Pokemon poke) {
		List<String> types = poke.getPokemonTypes().stream()
		        .sorted(Comparator.comparingInt(PokemonType::getSlot)) 	//Ordena la lista por el campo slot.
		        .map(pokemonType -> pokemonType.getType().getName())
		        .distinct() 											//Evita duplicados.
		        .collect(Collectors.toList());

        return new PokeInfoCompleteDTO(
            poke.getId(),
            poke.getName(),
            poke.getHeight(),
            poke.getWeight(),
            poke.getHp(),
            poke.getAttack(),
            poke.getDefense(),
            poke.getSpecial_attack(),
            poke.getSpecial_defense(),
            poke.getSpeed(),
            poke.getImage(),
            poke.getIcon(),
            poke.getTier() != null ? poke.getTier().getId() : 0,
            poke.getGeneration() != null ? poke.getGeneration().getId() : 0,
            poke.getRegionOrigin() != null ? poke.getRegionOrigin().getName() : "Desconocida",
            types
        );
    }
	
	public static PokedexItemDTO mapperToItemDTO(Pokemon poke) {
		List<String> types = poke.getPokemonTypes().stream()
				.sorted(Comparator.comparingInt(PokemonType::getSlot))
				.map(pokemonType -> pokemonType.getType().getName())
				.distinct()
				.collect(Collectors.toList());

			return new PokedexItemDTO(
				poke.getId(),
				poke.getName(),
				poke.getImage(),
				types
			);
	}
}
