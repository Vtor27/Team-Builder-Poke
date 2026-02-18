package com.teambuilder.domain;

import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "evolutions")
@Getter
@Setter
public class Evolutions {

	@Id
	@EqualsAndHashCode.Include
	private Integer id;
	
	@Column(name = "from_pokemon_id")
	private Integer from_pokemon_id;
	
	@Column(name = "to_pokemon_id")
	private Integer to_pokemon_id; 
	
	private String method;
	private Integer level;
	private Integer item_id;
	private String time_of_day;
	private String location;
	private Integer gender;
	private Integer happiness;
	private Integer beauty;
	private Integer affection;
	private boolean needs_overworld_rain;
	private boolean turn_upside_down;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "from_pokemon_id", insertable = false, updatable = false)
	private Pokemon fromPokemon;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "to_pokemon_id", insertable = false, updatable = false)
	private Pokemon toPokemon;
	
	
}
