package com.teambuilder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbilityDTO {

	private Integer id;
	private String name;
	private String effect;
	private Integer slot;
	private boolean hidden;
}
