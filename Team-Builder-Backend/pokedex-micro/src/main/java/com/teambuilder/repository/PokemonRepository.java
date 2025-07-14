package com.teambuilder.repository;


import com.teambuilder.domain.Pokemon;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PokemonRepository extends JpaRepository<Pokemon, Integer>{

}
