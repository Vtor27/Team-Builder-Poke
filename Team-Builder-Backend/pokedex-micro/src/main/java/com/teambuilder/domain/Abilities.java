package com.teambuilder.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "abilities")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Abilities {

	@Id
	@EqualsAndHashCode.Include
	private Integer id;
	
	private String name;
	
	private String effect;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "generation_id")
	private Generation generation;
	
	@OneToMany(mappedBy = "abilities")
	private List<PokemonAbilities> pokemonLinks = new ArrayList<>();
}
