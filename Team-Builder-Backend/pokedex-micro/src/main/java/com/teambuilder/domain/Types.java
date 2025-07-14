package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "types")
@Data
public class Types {
	
	@Id
	private Integer id;
	
	private String name;
	
	//Relaciones
	@ManyToMany(mappedBy = "types")
	private List<Pokemon> pokemons;
	
}
