package com.teambuilder.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "types")
@Data
public class Types {
	
	@Id
	private Integer id;
	
	@Column(name = "nombre")
	private String name;
	
	//Relaciones
	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PokemonType> types = new HashSet<>();
	
}
