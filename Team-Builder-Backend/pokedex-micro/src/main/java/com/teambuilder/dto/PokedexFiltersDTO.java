package com.teambuilder.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PokedexFiltersDTO {
	
	private String name;
	private List<String> type;
	private String regionApparitions;
	private Integer generations;
	private String tier;
	private String regionOrigin;
	
	
}
