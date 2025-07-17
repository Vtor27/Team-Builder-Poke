package com.teambuilder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PokedexItemDTO {
	
	private int id;
	private String name;
	private String image;
}
