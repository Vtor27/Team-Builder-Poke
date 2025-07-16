package com.teambuilder.repository;


import com.teambuilder.domain.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Integer>, PokedexRepositoryCustom{

}
