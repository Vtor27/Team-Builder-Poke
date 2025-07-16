package com.teambuilder.domain;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "pokemon")
@Getter
@Setter
@ToString(exclude = {"regionApparitions", "types"})
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
	
	@Column(name = "icon_mini")
	private String icon;
	
	//Relaciones
	@ManyToOne
	@JoinColumn(name = "region_origin")
	private Region regionOrigin;
	
	@OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<RegionApparitions> regionApparitions = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "generation_id")
	private Generation generation;
	
	@ManyToOne
	@JoinColumn(name = "tier_id")
	private Tier tier;
	
	@ManyToMany
	@JoinTable(
	name= "pokemon_type",
	joinColumns = @JoinColumn(name = "pokemon_id"),
	inverseJoinColumns = @JoinColumn(name = "type_id")
	)
	private Set<Types> types = new HashSet<>();
}
