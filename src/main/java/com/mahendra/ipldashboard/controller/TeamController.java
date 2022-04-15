package com.mahendra.ipldashboard.controller;

import com.mahendra.ipldashboard.model.Team;
import com.mahendra.ipldashboard.model.Match;
import com.mahendra.ipldashboard.repository.MatchRepository;
import com.mahendra.ipldashboard.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
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

  @GetMapping("/team/list")
  public Iterable<Team> getTeamsList() {
    return this.teamRepository.findAll();
  }
  
  @GetMapping("/team/{teamName}")
  public Team getTeam(@PathVariable String teamName) {
    Team team = this.teamRepository.findByTeamName(teamName);
    team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));

    return team;
  }

  @GetMapping("/team/{teamName}/matches")
  public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year) {
    LocalDate startDate = LocalDate.of(year, 1, 1);
    LocalDate endDate = LocalDate.of(year, 12, 31);
    
    List<Match> matches = this.matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
    return matches;
  }
}
