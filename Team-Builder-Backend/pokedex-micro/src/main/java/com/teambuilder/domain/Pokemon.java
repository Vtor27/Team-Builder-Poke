package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pokemon")
@Data
public class Pokemon {
	
	@Id
	private Integer id;
	
	private String name;
	private double height;
	private double weight;
	private int hp;
	private int attack;
	private int defense;
	private int special_attack;
	private int special_defense;
	private int speed;
	private String image;
	
	@Column(name = "icon_mini")
	private String icon;
	
	//Relaciones
	@ManyToOne
	@JoinColumn(name = "region_origin")
	private Region regionOrigin;
	
	@OneToMany(mappedBy = "pokemon")
	private List<RegionApparitions> regionAparitions;
	
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
	private List<Types> types;
}
