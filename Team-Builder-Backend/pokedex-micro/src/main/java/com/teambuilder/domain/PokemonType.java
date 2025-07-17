package com.teambuilder.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pokemon_type")
@Data
public class PokemonType {

    @EmbeddedId
    private PokemonTypeId id;

    @ManyToOne
    @MapsId("pokemonId")
    @JoinColumn(name = "pokemon_id")
    private Pokemon pokemon;

    @ManyToOne
    @MapsId("typeId")
    @JoinColumn(name = "type_id")
    private Types type;

    @Column(name = "slot")
    private int slot;
}