package com.mahendra.ipldashboard.data;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.mahendra.ipldashboard.model.Team;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private final Logger logger = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private EntityManager entityManager;

  @Autowired
  public JobCompletionNotificationListener(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

 @Override
 @Transactional
 public void afterJob(JobExecution jobExecution) {
   if(jobExecution.getStatus() != BatchStatus.COMPLETED) {
    logger.info("Job Not Completed {}", jobExecution.getId());
   }

    logger.info("Job Completed {}", jobExecution.getId());
    Map<String, Team> teams = new HashMap<>();

    entityManager.createQuery("select team1, count(*) from Match group by team1", Object[].class)
    .getResultList()
    .stream()
    .map(e -> new Team((String) e[0], (long) e[1]))
    .forEach(team -> teams.put(team.getTeamName(), team));

    entityManager.createQuery("select team2, count(*) from Match group by team2", Object[].class)
    .getResultList()
    .stream()
    .forEach(e -> {
      String teamName = (String) e[0];
      Team team = teams.get(teamName);

      team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
    });

    entityManager.createQuery("select matchWinner, count(*) from Match group by matchWinner", Object[].class)
    .getResultList()
    .stream()
    .forEach(e -> {
      String teamName = (String) e[0];
      Team team = teams.get(teamName);
      if(team != null) team.setTotalWins((long) e[1]);
    });

    teams.values().forEach(team -> {
      System.out.println(team);
      entityManager.persist(team);
    });
 }
}
