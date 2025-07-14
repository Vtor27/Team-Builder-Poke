package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "region")
@Data
public class Region {
	
	@Id
	private Integer id;
	
	private String name;

	//Relaciones
	@OneToMany(mappedBy = "regionOrigin")
	private List<Pokemon> originRegion;
	
	@ManyToMany
	@JoinTable(
			name = "region_apparitions",							//Nombre de la tabla intermedia
			joinColumns = @JoinColumn(name = "region_id"),			//Foreing key(FK) hacia esta entidad
			inverseJoinColumns = @JoinColumn(name = "pokemon_id")	//FK hacia la otra ntidad
			
	)
	private List<Pokemon> pokemonList;
}
