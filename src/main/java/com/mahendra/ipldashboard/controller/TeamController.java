package com.mahendra.ipldashboard.controller;

import com.mahendra.ipldashboard.model.Team;
import com.mahendra.ipldashboard.repository.MatchRepository;
import com.mahendra.ipldashboard.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class TeamController {

  private TeamRepository teamRepository;
  private MatchRepository matchRepository;

  @Autowired
  public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
    this.teamRepository = teamRepository;
    this.matchRepository = matchRepository;
  }
  
  @GetMapping("/team/{teamName}")
  public Team getTeam(@PathVariable String teamName) {
    Team team = this.teamRepository.findByTeamName(teamName);
    team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));

    return team;
  }
}
