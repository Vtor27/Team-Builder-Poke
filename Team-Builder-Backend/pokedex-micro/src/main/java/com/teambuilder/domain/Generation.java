package com.teambuilder.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "generation")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = {"pokemons", "abilities"})
public class Generation {

  @Id
  @EqualsAndHashCode.Include
  private Integer id;

  private Integer number;

  @OneToMany(mappedBy = "generation")
  private Set<Pokemon> pokemons = new HashSet<>();

  // ✅ La colección es de Abilities (no de PokemonAbilities)
  @OneToMany(mappedBy = "generation", targetEntity = Abilities.class) // targetEntity por si queda cacheado el genérico
  private List<Abilities> abilities = new ArrayList<>();
}

