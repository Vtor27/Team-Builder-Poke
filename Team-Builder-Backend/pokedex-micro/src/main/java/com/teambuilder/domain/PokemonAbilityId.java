package com.teambuilder.domain;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class PokemonAbilityId implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(name = "pokemon_id")
	private Integer pokemonId;
	
	@Column(name = "ability_id")
	private Integer abilityId;
}
