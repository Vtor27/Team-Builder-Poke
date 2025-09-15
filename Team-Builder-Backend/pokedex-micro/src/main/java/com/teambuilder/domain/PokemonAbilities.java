package com.teambuilder.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pokemon_abilities")
@Getter
@Setter
public class PokemonAbilities {
	
	@EmbeddedId
	private PokemonAbilityId id = new PokemonAbilityId();
	
	@ManyToOne
	@MapsId("pokemonId")			//Nombre del atributo en PokemonAbilitieId.
	@JoinColumn(name = "pokemon_id", nullable = false)
	private Pokemon pokemon;
	
	@ManyToOne
	@MapsId("abilityId")
	@JoinColumn(name = "ability_id", nullable = false)
	private Abilities abilities;
	
	@Column(nullable = false)
	private Integer slot;
	
	@Column(name = "is_hidden", nullable = false)
	private Boolean isHidden;
}
