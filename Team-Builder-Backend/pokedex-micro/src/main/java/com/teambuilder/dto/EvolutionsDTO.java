package com.teambuilder.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EvolutionsDTO {
	
	private Integer id;
	private String name;
	private List<String> type;
	private String icon;
}
