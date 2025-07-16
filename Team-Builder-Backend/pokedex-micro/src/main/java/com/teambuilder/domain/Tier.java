package com.teambuilder.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "tier")
public class Tier {
	
	@Id
	private Integer id;
	
	private String name;

	//Relaciones
	@OneToMany(mappedBy = "tier")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<Pokemon> pokemons = new HashSet<>();
}
