package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "tier")
public class Tier {
	
	@Id
	private Integer id;
	
	private String name;

	//Relaciones
	@OneToMany(mappedBy = "tier")
	private List<Pokemon> pokemons;
}
