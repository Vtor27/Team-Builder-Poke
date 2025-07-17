package com.teambuilder.domain;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Embeddable
@Data
@EqualsAndHashCode
public class PokemonTypeId implements Serializable{
	
	private static final long serialVersionUID = 1L;

    private Long pokemonId;
    private Long typeId;
}
