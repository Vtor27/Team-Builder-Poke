package com.teambuilder.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "generation")
@Data
public class Generation {
	
	@Id
	private Integer id;
	
	private Integer number;
	
	//Relaciones
	@OneToMany(mappedBy = "generation")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<Pokemon> pokemons = new HashSet<>();
	
}
