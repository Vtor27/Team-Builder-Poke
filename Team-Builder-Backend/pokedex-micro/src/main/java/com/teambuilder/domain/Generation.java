package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "generation")
@Data
public class Generation {
	
	@Id
	private Integer id;
	
	private int number;
	
	//Relaciones
	@OneToMany(mappedBy = "generation")
	private List<Pokemon> pokemons;
	
}
