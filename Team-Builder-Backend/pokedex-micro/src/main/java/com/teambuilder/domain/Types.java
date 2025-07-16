package com.teambuilder.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "types")
@Data
public class Types {
	
	@Id
	private Integer id;
	
	@Column(name = "nombre")
	private String name;
	
	//Relaciones
	@ManyToMany(mappedBy = "types")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<Pokemon> pokemons = new HashSet<>();
	
}
