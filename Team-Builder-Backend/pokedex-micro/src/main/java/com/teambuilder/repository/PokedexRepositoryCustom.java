package com.teambuilder.repository;

import java.util.List;
import com.teambuilder.domain.Pokemon;

public interface PokedexRepositoryCustom {

	List<Pokemon> advancedFilter(String name, String type, String region, Integer generation, String tier, String regionOrigin);
}
