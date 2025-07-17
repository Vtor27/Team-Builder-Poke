package com.teambuilder.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@AllArgsConstructor
@NoArgsConstructor
public class PokeInfoCompleteDTO {
	
	private int id;
	
	private String name;
	private Double height;
	private Double weight;
	private Integer hp;
	private Integer attack;
	private Integer defense;
	private Integer special_attack;
	private Integer special_defense;	private Integer speed;
//	private String nextEvolution;
//	private String prevEvolution;
	private String image;
	private String icon;
	
	private Integer tier;
	private Integer generation;
	private String region;
	private List<String> types;}

