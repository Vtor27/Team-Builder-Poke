package com.teambuilder.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "pokemon")
@Getter
@Setter
@ToString(exclude = {"pokemonTypes"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Pokemon {
	
	@Id
	@EqualsAndHashCode.Include
	private Integer id;
	
	@EqualsAndHashCode.Include
	private String name;
	
	private Double height;
	private Double weight;
	private Integer hp;
	private Integer attack;
	private Integer defense;
	private Integer special_attack;
	private Integer special_defense;
	private Integer speed;
	private String image;
	private String category;
	
	@Column(name = "icon_mini")
	private String icon;
	
	
	//Relaciones
	@ManyToOne
	@JoinColumn(name = "region_origin")
	private Region regionOrigin;
	
//	@OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, orphanRemoval = true)
//	private Set<RegionApparitions> regionApparitions = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "generation_id")
	private Generation generation;
	
	@ManyToOne
	@JoinColumn(name = "tier_id")
	private Tier tier;

	@OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("slot ASC")
	private List<PokemonType> pokemonTypes = new ArrayList<>();
	
	@OneToMany(mappedBy = "from_pokemon_id", fetch = FetchType.LAZY)
	private List<Evolutions> evolutionTo = new ArrayList<>();
	
	@OneToMany(mappedBy = "to_pokemon_id", fetch = FetchType.LAZY)
	private List<Evolutions> evolutionFrom = new ArrayList<>();
}
