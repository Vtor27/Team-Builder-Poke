package com.teambuilder.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pokemon_type")
@Data
public class PokemonType {
	@Id
	@ManyToOne
	@JoinColumn(name = "pokemon_id")
	private Pokemon pokemon;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "type_id")
	private Types types;
}
